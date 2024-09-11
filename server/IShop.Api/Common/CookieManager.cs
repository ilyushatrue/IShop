using IShop.Domain.Enums;
using IShop.Domain.UserRoot;

namespace IShop.Api.Common;
public class CookieManager(IHttpContextAccessor httpContextAccessor)
{
    private readonly IResponseCookies _responseCookies = httpContextAccessor.HttpContext!.Response.Cookies;

    public void SetUserCookies(User user)
    {
        _responseCookies.Append("user-id", user.Id.ToString());
        _responseCookies.Append("user-first-name", user.FirstName);
        _responseCookies.Append("user-last-name", user.LastName);
        _responseCookies.Append("user-email", user.Email.Value);
        _responseCookies.Append("user-phone", user.Phone?.Value ?? "");
        _responseCookies.Append("user-avatar", user.AvatarId.ToString() ?? "");
        _responseCookies.Append("user-role", ((RoleEnum)user.RoleId).ToString());
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
