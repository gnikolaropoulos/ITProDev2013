using PortofolioManager.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace AnalyticsTests
{
	public class DataServiceTests
	{
		private static DataServiceController s_controller = new DataServiceController();

		[Fact]
		public void CanRetrieveSpecificAgent()
		{
			var agent = s_controller.AgentById(1);
			Assert.True(agent.Id == 1);
			Assert.True(agent.FirstName == "George");
		}

		[Fact]
		public void CanRetrieveAgentsSummary()
		{
			var agents = s_controller.AgentsSummary();
			Assert.NotNull(agents);
			Assert.NotEmpty(agents);
		}
	}
}
