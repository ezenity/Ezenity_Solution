using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbUp;
using Ezenity_QandA.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Ezenity_QandA.Authorization;

namespace Ezenity_QandA
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            EnsureDatabase.For.SqlDatabase(connectionString);
            var upgrader = DeployChanges.To
                          .SqlDatabase(connectionString, null)
                          .WithScriptsEmbeddedInAssembly(System.Reflection.Assembly.GetExecutingAssembly())
                          .WithTransaction()
                          .Build();
            if (upgrader.IsUpgradeRequired())
            {
              upgrader.PerformUpgrade();
            }

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Ezenity_QandA", Version = "v1" });
            });

            // Make the data repository available for dependency injection. Whenever IDataRepository is 
            // referenced in a constructor, substitute an isntance of the DataRepository class.
            //
            // AddScope: Only one instance of the class is created in a given HTTP request (Last for whole HTTP request)
            // AddTransient: Generate a new instance of the class each time it is requested
            // AddSingleton: Geernate only one clas instance for the lifetime of the whole app
            services.AddScoped<IDataRepository, DataRepository>();

            // Make cache available for dependency injection.
            //
            // For this dependecy injection, it is getting added as a singlton. This makes a single instance of the
            // class for the lifetime of the application. Seperate HTTP request will access the same class instance
            // which will access the same cached data.
            services.AddMemoryCache();
            services.AddSingleton<IQuestionCache, QuestionCache>();

            // Configures ASP.NET backend to authenticate with Auth0
            //
            // this is specifically adding JWT-based authentication which is
            // specifying the authority and expected audience as the appsettings.json
            services.AddAuthentication(options =>
            {
              options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
              options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
              options.Authority = Configuration["Auth0:Authority"];
              options.Audience = Configuration["Auth0:Audience"];
            });

            // Call an Auth0 service which makes the HTTP client available
            services.AddHttpClient();
            
            // This defines a authorization policy and its requirements that is held within a class called 'MustbeQuestionAuthorRequirement'
            services.AddAuthorization(options => options.AddPolicy("MustBeQuestionauthor", policy => policy.Requirements.Add(new MustBeQuestionAuthorRequirement())));

            // Authorization policy handler for the requirement. registering for dependency injection
            services.AddScoped<IAuthorizationHandler, MustBeQuestionAuthorHandler> ();

            // Allow our handler class to access the HTTP request which will find out the question that is being requested. Registering
            // this for dependency injection to get access to the HTTP request information in a class
            //
            // NOTE => This is a convience method for:
            //             AddSinglton<IHttpContextAccessor, HttpContextAccessor>
            services.AddHttpContextAccessor();

            // Defining the CORS (Cross-Origin resource Sharing) policy that allows origins specifiged in appsettings.json to access
            // the REST API. Allows requests with any HTTP method and any hTTP header
            services.AddCors(options =>
              options.AddPolicy("CorsPolicy", builder =>
                builder
                  .WithOrigins(Configuration["Frontend"])
                  .AllowAnyMethod()
                  .AllowAnyHeader()
              )
            );


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ezenity_QandA v1"));
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app.UseRouting();
            // Enable Cors Policy
            app.UseCors("CorsPolicy");
            // adds authentication middleware
            // Validates the access token in each request if one exists. if the check succeeds, the
            // user on the request context will be set
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
