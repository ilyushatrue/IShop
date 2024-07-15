using Flags.Domain.UserRoot;

namespace Flags.Api.Common;
public class CookieManager(IHttpContextAccessor httpContextAccessor)
{
    private readonly IResponseCookies _responseCookies = httpContextAccessor.HttpContext!.Response.Cookies;
    private readonly IRequestCookieCollection _requestCookies = httpContextAccessor.HttpContext!.Request.Cookies;

    public void SetUserCookies(User user)
    {
        _responseCookies.Append("user-first-name", user.FirstName);
        _responseCookies.Append("user-last-name", user.LastName);
        _responseCookies.Append("user-email", user.Email.Value);
        _responseCookies.Append("user-phone", user.Phone?.Value ?? "");
        _responseCookies.Append("user-avatar", user.AvatarId.ToString() ?? "");
    }
    public (string? firstName, string? lastName, string? phone, string? email, string? avatarId) GetUserCookies()
    {
        var firstName = _requestCookies["user-first-name"];
        var lastName = _requestCookies["user-last-name"];
        var phone = _requestCookies["user-phone"];
        var email = _requestCookies["user-email"];
        var avatarId = _requestCookies["user-avatar"];
        return (firstName, lastName, phone, email, avatarId);
    }

    public void SetJwtAccessTokenCookie(string jwtAccessToken)
    {
        _responseCookies.Append("jwt-access-token", jwtAccessToken);
    }
    public void DeleteJwtAccessTokenCookie()
    {
        _responseCookies.Delete("jwt-access-token");
    }
}
