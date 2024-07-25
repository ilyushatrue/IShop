namespace IShop.Domain.Common.Models;
public class AuditEntity<T>(T id) : Entity<T>(id), IAuditEntity where T : notnull
{
    public DateTime? CreatedDate { get; private set; }
    public DateTime? UpdatedDate { get; private set; }
    public Guid? CreatedBy { get; private set; }
    public Guid? UpdatedBy { get; private set; }

    public void SetMetadata(DateTime? createdDate, DateTime? updatedDate, Guid? createdBy, Guid? updatedBy)
    {
        CreatedDate = createdDate;
        UpdatedDate = updatedDate;
        CreatedBy = createdBy;
        UpdatedBy = updatedBy;
    }
}
