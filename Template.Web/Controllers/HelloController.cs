using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Template.Web.Models;

namespace Template.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HelloController : ControllerBase
{
    [HttpGet]
    public Hello Get()
    {
        return new Hello { Text = "Hello!" };
    }
}
