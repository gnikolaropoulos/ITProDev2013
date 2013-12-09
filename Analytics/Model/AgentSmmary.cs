using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;

namespace PortofolioManager.Model
{
	public class AgentSymmary
	{
		public Int32 Id { get; set; }
		public String FirstName { get; set; }
		public String LastName { get; set; }
		public String Address { get; set; }
		public String City { get; set; }
		public Int32 AssetsCount { get; set; }
		[JsonConverter(typeof(StringEnumConverter))]
		public Gender Gender { get; set; }
	}
}