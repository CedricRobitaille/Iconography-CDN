using System.Linq.Expressions;
using Backend.Models;

public static class IconProjections
{
  public static Expression<Func<Icon, IconReadDto>> ToIconDisplayDto()
  {
    return i => new IconReadDto
    {
      Id = i.Id,
      Name = i.Name,
      Style = i.Style,
      Type = i.Type,
      Category = i.Category,
      Svg = i.Svg,
      Tags = i.Icon_Tags
        .Select(it => new IconTagDto
        {
          Id = it.Tag.Id,
          Name = it.Tag.Name
        })
    };
  }
}