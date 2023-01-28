using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Template.Web.Utilities;

public class DistFileLookup
{
    readonly string _distPath;

    public DistFileLookup(string distPath)
    {
        this._distPath = distPath;
    }

    public string ResolveFileName(string folder, string startsWith, string endsWith)
    {
        foreach (
            var fi in new DirectoryInfo(
                _distPath + (folder != null ? "/" : "") + folder
            ).EnumerateFiles()
        )
        {
            if (fi.Name.StartsWith(startsWith) && fi.Name.EndsWith(endsWith))
                return fi.Name;
        }
        throw new InvalidOperationException(
            $"Cannot find a dist file matching the given pattern: {startsWith}*{endsWith}"
        );
    }
}
