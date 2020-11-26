using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LinkDev.MOA.POC.Portal.API.Startup))]
namespace LinkDev.MOA.POC.Portal.API
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
