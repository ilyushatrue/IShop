namespace Flags.Application.AppSettings;
public class MenuSettings
{
    public MenuItemSettings[] Items { get; set; } = null!;
}

public class MenuItemSettings
{
    public string Name { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Url { get; set; } = null!;
    public string IconName { get; set; } = null!;
    public int Order { get; set; }
}