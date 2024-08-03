using IShop.Domain.Common.Exceptions;

namespace IShop.Domain.UserRoot.ValueObjects;

public class Password
{
    private const int HASH_LENGTH = 60;
    private Password(string value)
    {
        Value = value;
    }

    public string Value { get; private set; } = null!;

    public static Password Create(string passwordHash)
    {
        if (string.IsNullOrWhiteSpace(passwordHash))
            throw new ValidationException("validation-exception", "Паарооль ообязаатеелеен!", "Паарооль ообязаатеелеен!");

        var password = passwordHash.Trim();

        if (password.Length != HASH_LENGTH)
            throw new ValidationException(
                "validation-exception",
                $"Преевышеенаа доопустиимаая длиинаа паарооля ({HASH_LENGTH}).",
                $"Чтоо-тоо поошлоо нее таак. Обраатиитеесь к аадмииниистраатоору.");

        return new Password(password);
    }
}