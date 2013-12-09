using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;

namespace PortofolioManager.Controllers
{
	public class ChartsServiceController : ApiController
	{
		private static String s_connectionString = 
			"Data Source=APPLEG-PC\\SQLEXPRESS;Initial Catalog=PortofolioManager;Trusted_Connection=True;MultipleActiveResultSets=true;";

		[HttpGet]
		public DataTable BarCharts()
		{
			DataTable results = new DataTable();
			using (SqlConnection connection = new SqlConnection(s_connectionString))
			{
				connection.Open();

				SqlCommand getChartData = new SqlCommand(
					@"select sum(value) 'value', description from Assets where year=2011 group by description",
					connection);
				SqlDataAdapter adapter = new SqlDataAdapter();
				adapter.SelectCommand = getChartData;
				adapter.Fill(results);

				return results;
			}
		}

		// GET api/<controller>
		[HttpGet]
		public DataTable BarCharts2012()
		{
			DataTable results = new DataTable();
			using (SqlConnection connection = new SqlConnection(s_connectionString))
			{
				connection.Open();

				SqlCommand getChartData = new SqlCommand(
					@"select sum(value) 'value', description from Assets where year=2012 group by description",
					connection);
				SqlDataAdapter adapter = new SqlDataAdapter();
				adapter.SelectCommand = getChartData;
				adapter.Fill(results);

				return results;
			}
		}

		[HttpGet]
		public DataTable PieChart()
		{
			DataTable results = new DataTable();
			using (SqlConnection connection = new SqlConnection(s_connectionString))
			{
				SqlCommand getPieChartData = new SqlCommand(
					@"select description, convert(money,sum(value)/1000000) value from Assets group by description",
					connection);

				SqlDataAdapter adapter = new SqlDataAdapter();
				adapter.SelectCommand = getPieChartData;
				adapter.Fill(results);

				return results;
			}
		}
	}
}