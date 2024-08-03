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
            throw new ValidationException("validation-exception", "�������� ��������������!", "�������� ��������������!");

        var password = passwordHash.Trim();

        if (password.Length != HASH_LENGTH)
            throw new ValidationException(
                "validation-exception",
                $"������������ ������������� ������� �������� ({HASH_LENGTH}).",
                $"����-��� ������� ��� ����. ������������� � �������������������.");

        return new Password(password);
    }
}