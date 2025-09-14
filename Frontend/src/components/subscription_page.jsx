import { Toaster } from "react-hot-toast";

import "../style_folder/subscriptionPage.css"

export default function SubscriptionPage() {
  const plans = [
    {
      name: "One-time Pass",
      price: "₹19",
      duration: "One test only",
      description: "Best for a quick practice before interviews.",
      features: [
        "Access to 1 test only",
        "Self-evaluation only",
        "No AI feedback",
        "No detailed reports",
      ],
      button: "Get Started",
      highlight: false,
      gold_highlight: false,
    },
    {
      name: "Basic Pass",
      price: "₹49",
      duration: "Per month",
      description: "Best for freshers or professionals preparing for a job switch.",
      features: [
        "AI-powered feedback",
        "Detailed test reports",
        "Identify weak areas",
        "Strength evaluation",
      ],
      button: "Get Started",
      highlight: true, 
      gold_highlight: false, // highlight this one
    },
    {
      name: "Premium Pass",
      price: "₹499",
      duration: "Lifetime access",
      description: "Budget-friendly, unlimited tests for life.",
      features: ["Everything in Basic", "One-time payment, lifetime access"],
      button: "Get Started",
      highlight: false,
      gold_highlight : true
    },
  ];

  return (
    <>
      <div className="subscription_page_container">
        <div className="subscription_plan_text_content">
            <div className="subscription_plan_tile">BOOST Your Career with the Right Plan</div>
            <div className="subscription_plan_subtitle">
                Affordable subscription plans designed to sharpen your skills, build confidence, and help you land your dream job in top companies.
            </div>
        </div>

        
        <div className="subscription_plan_cards">


            {plans.map((item, i)=>{
                return(
                    <div key={i} className={`individual_plan ${item.highlight === true ? "active" : ""} ${item.gold_highlight === true ? "gold_active" : ""} `}>
                        <div className="plan_card_name">{item.name}</div>
                        <div className="plan_card_price">{item.price}</div>
                        <div className="plan_card_description">{item.description}</div>
                        <div className="plan_card_features">

                            <ul>
                                {item.features.map((features,i) =>(
                                    <li key={i}>{features}</li>
                                ))}

                            </ul>
                            
                        </div>
                        <button className="plan_btn">{item.button}</button>

                    </div>
                )
            })}
            

        </div>
        
      </div>
      <Toaster />
    </>
  );
}
