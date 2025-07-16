using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Options;
using System.Text.Json.Serialization;
using IShop.Application.AppSettings;
using IShop.Domain.Common.Exceptions;

namespace IShop.Api.Middlewares
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
                await HandleExceptionAsync(httpContext, StatusCodes.Status401Unauthorized, ex.Name, ex.Message, ex.UserMessage);
            }
            catch (ValidationException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, ex.Name, ex.Message, ex.UserMessage);
            }
            catch (NotFoundException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status404NotFound, ex.Name, ex.Message, ex.UserMessage);
            }
            catch (InvalidCredentialsException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, ex.Name, ex.Message, ex.UserMessage);
            }
            catch (ExpirationException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status406NotAcceptable, ex.Name, ex.Message, ex.UserMessage);
            }
            catch (InvalidUsageException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, ex.Name, ex.Message, ex.UserMessage);
            }
            catch (UniquenessViolationExeption ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, ex.Name, ex.Message, ex.UserMessage);
            }
            catch (ConflictException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status409Conflict, ex.Name, ex.Message, ex.UserMessage);
            }
            catch (ArgumentNullException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, "argument-null-exception", ex.Message, ex.Message);
            }
            catch (ArgumentOutOfRangeException ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status400BadRequest, "argument-out-of-range-exception", ex.Message);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status500InternalServerError, "internal-server-error", ex.Message);
            }

            if (httpContext.Response.StatusCode == StatusCodes.Status401Unauthorized)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status401Unauthorized, "unauthorized", "Ошибка аутентификации", "Пожалуйста, войдите в систему.");
            }

            if (httpContext.Response.StatusCode == StatusCodes.Status403Forbidden)
            {
                await HandleExceptionAsync(httpContext, StatusCodes.Status403Forbidden, "no-permission", "Недостаточно прав", "Недостаточно прав.");
            }
        }

        private async Task HandleExceptionAsync(HttpContext httpContext, int statusCode, string exceptionName, string exceptionMessage, string? userMessage = null)
        {
            _logger.LogError(exceptionMessage);
            HttpResponse response = httpContext.Response;
            response.StatusCode = statusCode;

            var acceptHeader = httpContext.Request.Headers.Accept.ToString();
            if (acceptHeader.Contains("text/html"))
            {
                await GenerateHtmlErrorResponse(response, userMessage);
            }
            else
            {
                await GenarateJsonErrorResponse(httpContext, response, exceptionName, userMessage);
            }
        }

        private static async Task GenarateJsonErrorResponse(HttpContext httpContext, HttpResponse response, string exceptionName, string? userMessage = null)
        {
            response.ContentType = "application/json; charset=utf-8";

            var errorDetail = new
            {
                title = "Возникла ошибка при выполнени запроса.",
                status = response.StatusCode,
                message = userMessage,
                name = exceptionName,
                traceId = httpContext.TraceIdentifier
            };

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                WriteIndented = true
            };

            string result = JsonSerializer.Serialize(errorDetail, options);
            await response.WriteAsync(result, Encoding.UTF8);
        }

        private async Task GenerateHtmlErrorResponse(HttpResponse response, string? userMessage = null)
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
                                    <p>{userMessage ?? ""}</p>
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