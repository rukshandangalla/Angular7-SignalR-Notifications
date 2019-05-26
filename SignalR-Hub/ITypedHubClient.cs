using System.Threading.Tasks;

namespace SignalR_Hub
{
    public interface ITypedHubClient
    {
        Task BroadcastMessage(string type, string payload);
    }
}
