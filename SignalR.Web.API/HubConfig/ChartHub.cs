using Microsoft.AspNetCore.SignalR;
using SignalR.Web.API.Model;

namespace SignalR.Web.API.HubConfig
{
    public class ChartHub : Hub
    {
        public async Task BroadCastChartData(List<ChartModel> chartData)
        {
            await Clients.All.SendAsync("broadcastchartdata", chartData);
        }
    }
}