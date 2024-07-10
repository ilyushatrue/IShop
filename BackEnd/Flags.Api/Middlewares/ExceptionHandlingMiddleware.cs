using Flags.Domain.Common.Exceptions;
using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Options;
using Flags.Application.AppSettings;

namespace Flags.Api.Middlewares
{
    public class ExceptionHandlingMiddleware(
        ILogger<ExceptionHandlingMiddleware> logger,
        RequestDelegate next,
        IOptions<EmailSettings> emailSettings)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger = logger;
        private readonly EmailSettings _emailSettings = emailSettings.Value;

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
            catch (ExpirationException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status406NotAcceptable, ex.Message);
            }
            catch (InvalidUsageException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, ex.Message, ex.ErrorName);
            }
            catch (UniquenessViolationExeption ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status500InternalServerError, ex.Message);
            }

            if (httpContext.Response.StatusCode == StatusCodes.Status403Forbidden)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status403Forbidden, "Недостаточно прав");
            }
        }

        private async Task HandleExceptionAsync(HttpContext httpContext, int statusCode, string exceptionMessage, string? exceptionName = null)
        {
            _logger.LogError(exceptionMessage);
            HttpResponse response = httpContext.Response;
            response.StatusCode = statusCode;

            var acceptHeader = httpContext.Request.Headers.Accept.ToString();
            if (acceptHeader.Contains("text/html"))
            {
                await GenerateHtmlErrorResponse(exceptionMessage, response);
            }
            else
            {
                await GenarateJsonErrorResponse(httpContext, exceptionMessage, exceptionName ?? "", response);
            }
        }

        private static async Task GenarateJsonErrorResponse(HttpContext httpContext, string exceptionMessage, string exceptionName, HttpResponse response)
        {
            response.ContentType = "application/json; charset=utf-8";

            var errorDetail = new
            {
                title = "Возникла ошибка при выполнении запроса.",
                status = response.StatusCode,
                message = exceptionMessage,
                name = exceptionName,
                traceId = httpContext.TraceIdentifier
            };

            var options = new JsonSerializerOptions
            {
                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                WriteIndented = true
            };

            string result = JsonSerializer.Serialize(errorDetail, options);
            await response.WriteAsync(result, Encoding.UTF8);
        }

        private async Task GenerateHtmlErrorResponse(string exceptionMessage, HttpResponse response)
        {
            response.ContentType = "text/html";

            string htmlResponse = $@"
                    <!DOCTYPE html>
                    <html lang=""en"">
                        <head>
                            <meta charset=""utf-8"" />
                            <title>Error</title>
                            <style>
                                body {{
                                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                    background-color: #f8f9fa;
                                    color: #495057;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 100vh;
                                    margin: 0;
                                }}
                                .container {{
                                    text-align: center;
                                    background-color: #ffffff;
                                    padding: 40px;
                                    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
                                    border-radius: 10px;
                                }}
                                .container_body{{
                                    text-align: start;
                                }}
                                h1 {{
                                    font-size: 2rem;
                                    margin-bottom: 1rem;
                                }}
                                p {{
                                    margin: 0.5rem 0;
                                    font-size: 1rem;
                                }}
                                .email {{
                                    font-weight: bolder;
                                }}
                            </style>
                        </head>
                        <body>
                            <div class=""container"">
                                <h1>Упс... Ошибочка вышла!</h1>
                                    <div class=""container_body"">
                                    <p>{exceptionMessage}</p>
                                    <p>
                                        Напишите разработчику о проблеме 
                                        <span class=""email"">{_emailSettings.SenderEmail}</span>
                                    </p>
                                </div>
                            </div>
                        </body>
                    </html>";

            await response.WriteAsync(htmlResponse);
        }
    }
}