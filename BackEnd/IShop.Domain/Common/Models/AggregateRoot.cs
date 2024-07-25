namespace IShop.Domain.Common.Models;

public abstract class AggregateRoot<T> : AuditEntity<T> where T : notnull
{
    protected AggregateRoot(T id) : base(id)
    {

    }
}