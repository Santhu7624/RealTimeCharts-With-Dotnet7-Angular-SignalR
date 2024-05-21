using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Web.API.HubConfig;
using SignalR.Web.API.TimerFeatures;
using SignalR.Web.API.DataStorage;

namespace SignalR.Web.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChartController : ControllerBase
    {
        private readonly IHubContext<ChartHub> _hub;
        private readonly TimerManager _timer;

        public ChartController(IHubContext<ChartHub> hub, TimerManager timer)
        {
            _hub = hub;
            _timer = timer;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if(!_timer.isTimerStarted){
                _timer.PrepareTimer(() => 
                _hub.Clients.All.SendAsync("TransferChartData", DataManager.GetData()));
            }

            return Ok(new { Message = "Request Completed"});
        }
    }
}