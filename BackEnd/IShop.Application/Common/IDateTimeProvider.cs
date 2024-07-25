namespace IShop.Application.Common;
public interface IDateTimeProvider
{
    DateTime UtcNow { get; }
}
