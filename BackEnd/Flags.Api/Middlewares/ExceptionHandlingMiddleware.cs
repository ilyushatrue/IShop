using Flags.Domain.Common.Exceptions;
using System.Text.Json;

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
            catch (NotAuthenticatedException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status401Unauthorized, ex.Message);
            }
            catch (ValidationException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (NotFoundException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status404NotFound, ex.Message);
            }
            catch (InvalidCredentialsException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (ArgumentNullException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private async Task HandleExceptionAsync(
            HttpContext httpContext,
            int statusCode,
            string exceptionMessage)
        {
            _logger.LogError(exceptionMessage);
            HttpResponse response = httpContext.Response;
            response.ContentType = "application/json";
            response.StatusCode = statusCode;

            var errorDetail = new
            {
                title = "Возникла ошибка при выполнении запроса.",
                status = response.StatusCode,
                detail = exceptionMessage,
                traceId = httpContext.TraceIdentifier
            };

            var options = new JsonSerializerOptions
            {
                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                WriteIndented = true
            };

            string result = JsonSerializer.Serialize(errorDetail, options);
            await response.WriteAsync(result);
        }
    }

}