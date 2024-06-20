using FluentValidation;

namespace Flags.Application.Authentication.Queries;

public class LoginByPhoneQueryValidator : AbstractValidator<LoginByPhoneQuery>
{
    public LoginByPhoneQueryValidator()
    {
        RuleFor(x => x.Phone).NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
    }
}