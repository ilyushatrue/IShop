using FluentValidation;

namespace Flags.Application.Authentication.Queries.Login.ByPhone;

public class LoginByPhoneQueryValidator : AbstractValidator<LoginByPhoneQuery>
{
    public LoginByPhoneQueryValidator()
    {
        RuleFor(x => x.Phone).NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
    }
}