namespace Flags.Domain.Common.Models;
public interface IAuditEntity
{
    public DateTime? CreatedDate { get;  }
    public DateTime? UpdatedDate { get;  }
    public Guid? CreatedBy { get;  }
    public Guid? UpdatedBy { get;  }

    public void SetMetadata(DateTime? createdDate, DateTime? updatedDate, Guid? createdBy, Guid? updatedBy);
}
