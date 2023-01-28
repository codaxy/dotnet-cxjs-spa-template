using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Template.Web.Utilities;

public class CustomValidationErrors
{
    public static IActionResult InvalidModelStateResponseFactory(ActionContext context)
    {
        var errorResult = new ValidationErrorResult
        {
            Error = "Validation failed.",
            FieldErrors = new Dictionary<string, string>()
        };

        foreach (var field in context.ModelState)
        {
            var error = string.Join(' ', field.Value.Errors.Select(err => err.ErrorMessage));
            errorResult.FieldErrors[field.Key.ToLower()] = error;
            errorResult.Error += " " + error;
        }

        return new JsonResult(errorResult) { StatusCode = (int)HttpStatusCode.BadRequest };
    }

    public class ErrorResult
    {
        public string Error { get; set; } = null!;
        public string StackTrace { get; internal set; } = null!;
    }

    class ValidationErrorResult : ErrorResult
    {
        public Dictionary<string, string> FieldErrors { get; set; } = null!;
    }
}
