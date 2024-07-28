namespace IShop.Api.Common;

public record ErrorDto(
    string Message,
    int StatusCode);
