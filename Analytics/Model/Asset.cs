using System;

namespace PortofolioManager.Model
{
	public class Asset
	{
		public Int32 Id { get; set; }
		public String Description { get; set; }
		public Decimal Value { get; set; }
		public Int32 AgentID { get; set; }
		public Int32 Year { get; set; }
		public Agent Customer { get; set; }

		public Asset Clone()
		{
			return (Asset)this.MemberwiseClone();
		}
	}
}