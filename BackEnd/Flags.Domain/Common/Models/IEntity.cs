namespace Flags.Domain.Common.Models;
public interface IEntity<T>
{
    T Id { get; }
}
