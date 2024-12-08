import React from 'react'
import "../App.css"

function Banner() {
  return (
    <div>
      <section id="banner">
            <div className="banner_bg box">
            
                <div className="bg_content box">
                
                    <div className="text box">
                        <p className="bg_text">Fast, FREE way to get Hotels.</p>
                    </div>
                    
                        <div className="search box">

                            <div className="city">
                                <input id="citySearch" type="text" placeholder="Hyderabad" className="inp" />
                                <div className="result">

                                </div>
                            </div>
                            <div className="services">
                                <input type="text" id="service" placeholder="Find your Hotel here" className="inp" />
                                <div className="service_result">

                                </div>
                            </div>
                            <div className="bg_btn">
                                <input type="button" value="Get Hotel" className="btn" id="btn" />
                            </div>

                        </div>
                    
                </div>
                
            </div>
            
        </section>
      
    </div>
  )
}

export default Banner;
