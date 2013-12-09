using PortofolioManager.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;

namespace PortofolioManager.Controllers
{
	public class DataServiceController : ApiController
	{

		[HttpGet]
		public IQueryable<Agent> Agents()
		{
			List<Agent> agents = new List<Agent>();
			using (SqlConnection connection = new SqlConnection(
				"Data Source=APPLEG-PC\\SQLEXPRESS;Initial Catalog=PortofolioManager;Trusted_Connection=True;MultipleActiveResultSets=true;"))
			{
				SqlCommand command = new SqlCommand(@"select * from Agents", connection);
				connection.Open();
				SqlDataReader agentsReader = command.ExecuteReader();
				while (agentsReader.Read())
				{
					SqlCommand comm = new SqlCommand(@"select * from Assets where AgentID=@ID", connection);
					comm.Parameters.AddWithValue("@ID", agentsReader["Id"]);
					SqlDataReader assetsReader = comm.ExecuteReader();
					List<Asset> assets = new List<Asset>();
					while (assetsReader.Read())
					{
						assets.Add(new Asset
							{
								AgentID = Int32.Parse(assetsReader["AgentID"].ToString()),
								Id = Int32.Parse(assetsReader["Id"].ToString()),
								Description = assetsReader["Description"].ToString(),
								Value = Decimal.Parse(assetsReader["Value"].ToString()),
								Year = Int32.Parse(assetsReader["Year"].ToString()),
							});
					}

					agents.Add(new Agent
						{
							Id = Int32.Parse(agentsReader["Id"].ToString()),
							FirstName = agentsReader["FirstName"].ToString(),
							LastName = agentsReader["LastName"].ToString(),
							Address = agentsReader["Address"].ToString(),
							City = agentsReader["City"].ToString(),
							PostCode = Int32.Parse(agentsReader["PostCode"].ToString()),
							Gender = (Gender)Int32.Parse(agentsReader["Gender"].ToString()),
							Assets = assets,
						});
				}

				return agents.AsQueryable<Agent>();
			}
		}

		[HttpGet]
		public IQueryable<AgentSymmary> AgentsSummary()
		{
			List<AgentSymmary> list = new List<AgentSymmary>();

			using (SqlConnection connection = new SqlConnection(
				"Data Source=APPLEG-PC\\SQLEXPRESS;Initial Catalog=PortofolioManager;Trusted_Connection=True;MultipleActiveResultSets=true;"))
			{
				connection.Open();

				SqlCommand selectAgents = new SqlCommand(@"select * from Agents", connection);
				SqlCommand countAssets = new SqlCommand(@"select count(*) from Assets where AgentID=@ID", connection);
				countAssets.Parameters.Add("@ID", System.Data.SqlDbType.Int);
				countAssets.Prepare();

				SqlDataReader agentsReader = selectAgents.ExecuteReader();
				while (agentsReader.Read())
				{
					countAssets.Parameters["@ID"].Value = Int32.Parse(agentsReader["Id"].ToString());
					list.Add(new AgentSymmary
					{
						Id = Int32.Parse(agentsReader["Id"].ToString()),
						FirstName = agentsReader["FirstName"].ToString(),
						LastName = agentsReader["LastName"].ToString(),
						Address = agentsReader["Address"].ToString(),
						City = agentsReader["City"].ToString(),
						AssetsCount = Int32.Parse(countAssets.ExecuteScalar().ToString()),
						Gender = (Gender)Int16.Parse(agentsReader["Gender"].ToString()),
					});
				}


				return list.AsQueryable<AgentSymmary>();
			}
			//return _Context.Customers.Select(c => new CustomerSummary
			//{
			//    Id = c.Id,
			//    FirstName = c.FirstName,
			//    LastName = c.LastName,
			//    City = c.City,
			//    State = c.State,
			//    OrderCount = c.Orders.Count(),
			//    Gender = c.Gender
			//});
		}

		// GET api/<controller>/5
		[HttpGet]
		public Agent AgentById(int id)
		{
			Agent agent = new Agent();
			using (SqlConnection connection = new SqlConnection(
				"Data Source=APPLEG-PC\\SQLEXPRESS;Initial Catalog=PortofolioManager;Trusted_Connection=True;MultipleActiveResultSets=true;"))
			{
				connection.Open();

				SqlCommand selectAgents = new SqlCommand(@"select * from Agents where Id=@ID", connection);
				selectAgents.Parameters.Add("@ID", System.Data.SqlDbType.Int);
				selectAgents.Prepare();

				SqlCommand selectAssets = new SqlCommand(@"select * from Assets where AgentID=@ID", connection);
				selectAssets.Parameters.Add("@ID", System.Data.SqlDbType.Int);
				selectAssets.Prepare();

				selectAgents.Parameters["@ID"].Value = id;
				selectAssets.Parameters["@ID"].Value = id;

				SqlDataReader agentsReader = selectAgents.ExecuteReader();
				while (agentsReader.Read())
				{	
					SqlDataReader assetsReader = selectAssets.ExecuteReader();
					List<Asset> assets = new List<Asset>();
					while (assetsReader.Read())
					{
						assets.Add(new Asset
						{
							AgentID = Int32.Parse(assetsReader["AgentID"].ToString()),
							Id = Int32.Parse(assetsReader["Id"].ToString()),
							Description = assetsReader["Description"].ToString(),
							Value = Decimal.Parse(assetsReader["Value"].ToString()),
							Year = Int32.Parse(assetsReader["Year"].ToString()),
						});
					}

					agent.Id = Int32.Parse(agentsReader["Id"].ToString());
					agent.FirstName = agentsReader["FirstName"].ToString();
					agent.LastName = agentsReader["LastName"].ToString();
					agent.Address = agentsReader["Address"].ToString();
					agent.City = agentsReader["City"].ToString();
					agent.Gender = (Gender)Int16.Parse(agentsReader["Gender"].ToString());
					agent.Assets = assets;
				}

				return agent;
			}
		}

		// POST api/<controller>
		//[HttpPost]
		//public OperationStatus InsertAgent([FromBody]Agent agent)
		//{

		//}

		// PUT api/<controller>/5
		//[HttpPut]
		//public OperationStatus UpdateAgent(int id, [FromBody]Agent agent)
		//{

		//}

		// DELETE api/<controller>/5
		//[HttpDelete]
		//public OperationStatus DeleteAgent(int id)
		//{

		//}
	}
}