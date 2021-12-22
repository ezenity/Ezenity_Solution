using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Ezenity_React
{
    public class CustomLogger
    {
        private readonly RequestDelegate _next;

        public CustomLogger(RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        /**
         * This will get executed in the request/response pipeline.
         * 
         * The request details will log at the start of the Invoke method and log 
         * the response details after the _next delegate has been executed, which
         * will be when the rest of the pipeline has been executed.
         */
        public async Task Invoke(HttpContext httpContext)
        {
            if (httpContext == null) throw new ArgumentNullException(nameof(HttpContext));

            // TODO - log the request

            await _next(httpContext);

            // TODO - log the response
        }
    }
}
