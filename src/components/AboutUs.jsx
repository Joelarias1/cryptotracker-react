

const AboutUs = () => {
  return (
    <main className="py-24 bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-body-color">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4">
          <ServiceCard
            title="Multiple Currencies"
            details="Track the value of your investments in various cryptocurrencies in real-time. Stay updated on multiple digital currencies and their price fluctuations."
            icon="logo-usd"
            style={{fontSize:"32px"}}
          />
          <ServiceCard
            title="Market Insights"
            details="Access analyses and relevant information on current cryptocurrency market trends. Make informed decisions based on reliable data.."
            icon="logo-bitcoin"
            style={{fontSize:"32px"}}
          />
          <ServiceCard
            title="Historical Data"
            details="Examine the past performance of your digital assets. Understand how they have evolved over time and make strategic decisions."
            icon="analytics"
            style={{fontSize:"32px"}}
          />
          <ServiceCard
            title="News and Updates"
            details="Stay updated on the latest news and developments in the world of cryptocurrencies. Get relevant information and updates about your assets."
            icon="newspaper"
            style={{fontSize:"32px"}}
          />
          <ServiceCard
            title="Web3 Compatible"
            details="We enjoy working with discerning clients, people for whom quality, service, integrity & aesthetics matter."
            icon="wallet"
            style={{fontSize:"32px"}}
          />
          <ServiceCard
            title="Crypto Currencies and DeFi"
            details="We enjoy working with discerning clients, people for whom quality, service, integrity & aesthetics matter."
            icon="logo-bitcoin"
            style={{fontSize:"32px"}}

          />
        </div>
      </div>
    </main>
  );
};

const ServiceCard = ({ icon, title, details, style }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl">
      <div className="text-end">
        <ion-icon name={icon} style={style}></ion-icon> 
      </div>
      <h4 className="text-xl font-semibold text-dark my-4">{title}</h4>
      <p className="text-body-color">{details}</p>
    </div>
  );
};

export default AboutUs;
