using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalR.Web.API.TimerFeatures
{
    public class TimerManager
    {
        private Timer? _timer;
        private AutoResetEvent _autoResetEvent;
        private Action? _action;
        public DateTime TImerStarted { get; set; }

        public bool isTimerStarted { get; set; }



        public void PrepareTimer(Action action)
        {
            _action = action;
            _autoResetEvent = new AutoResetEvent(false);
            _timer = new Timer(Execute, _autoResetEvent, 5000, 2000);
            TImerStarted = DateTime.Now;
            isTimerStarted = true;
        }

        private void Execute(Object? stateInfo)
        {
            _action();
            if ((DateTime.Now - TImerStarted).TotalSeconds > 60)
            {
                isTimerStarted = false;
                _timer.Dispose();
            }
        }

    }
}