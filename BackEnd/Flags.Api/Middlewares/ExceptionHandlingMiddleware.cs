using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace Flags.Api.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(
            ILogger<ExceptionHandlingMiddleware> logger,
            RequestDelegate next)
        {
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (ValidationException ex)
            {
                await HandleExceptionAsync(httpContext, HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        private async Task HandleExceptionAsync(
            HttpContext httpContext,
            HttpStatusCode statusCode,
            string exceptionMessage)
        {
            _logger.LogError(exceptionMessage);
            HttpResponse response = httpContext.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)statusCode;

            var errorDetail = new
            {
                Type = "https://tools.ietf.org/html/rfc9110#section-15.5.1",
                Title = "An error occurred while processing your request.",
                Status = response.StatusCode,
                Detail = exceptionMessage,
                TraceId = httpContext.TraceIdentifier
            };

            string result = JsonSerializer.Serialize(errorDetail);
            await response.WriteAsync(result);
        }
    }

}