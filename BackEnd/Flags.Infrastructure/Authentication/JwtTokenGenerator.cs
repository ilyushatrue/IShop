using Flags.Application.Common.Interfaces.Authentication;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Flags.Application.Common.Interfaces.Services;
using Microsoft.Extensions.Options;
using Flags.Domain.User.Entities;
namespace Flags.Infrastructure.Authentication;
public class JwtTokenGenerator(
    IOptions<JwtSettings> jwtOptions,
    IDateTimeProvider dateTimeProvider) : IJwtTokenGenerator
{
    private readonly JwtSettings _jwtSettings = jwtOptions.Value;
    public string GenerateToken(User user)
    {
        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
            SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
            new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var securityToken = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            signingCredentials: signingCredentials,
            expires: dateTimeProvider.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes));

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
}
