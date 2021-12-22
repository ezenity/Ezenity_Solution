using Microsoft.AspNetCore.Builder;

namespace Ezenity_React
{
    public static class MiddlewareExtensions
    {
        /**
         * This method is used to register the middleware class.
         * 
         * By making the middleware available in an instance of IApplicationBuilder,
         * it can be added to the pipeline in the Configure method within the 
         * startup class.
         */
        public static IApplicationBuilder UseCustomLogger(this IApplicationBuilder app)
        {
            return app.UseMiddleware<CustomLogger>();
        }
    }
}
