using leafletProject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace leafletProject.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetAreas()
        {
            List<Areas> areas = new();
            areas.Add(new Areas
            {
                id = 1,
                userId = 1,
                latitude = "38.69858582473636",
                longitude = "35.504379272460945",
                description = "Hava İkmal Kirli Alan"
            });
            areas.Add(new Areas
            {
                id = 1,
                userId = 1,
                latitude = "38.73180326365896",
                longitude = "35.541801452636726",
                description = "Yıldırım Beyazıt Kirli Alan"
            });
            areas.Add(new Areas
            {
                id = 1,
                userId = 1,
                latitude = "38.696844162234065",
                longitude = "35.5514144897461",
                description = "Yenidoğan Kirli Alan"
            });
            return Json(areas);
        }

        public IActionResult Privacy()
        {

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}