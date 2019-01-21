import { h, Component } from 'preact';
import style from './style';
import APIservice from '../../components/api';

export default class Internships extends Component {

  state = {
    offers: []
  }

  componentDidMount() {
    document.title = 'Startup Mojo'

    APIservice.getAllOffers().then((data) => {
      console.log(data)
      let filteredOffers = data.records.filter((element) => this.isComplete(element))
      this.setState({ offers: filteredOffers })
    })
  }

  isComplete(offer) {
    return offer.fields.Company !== undefined
      && offer.fields.Title !== undefined
      && offer.fields.Location !== undefined
      && offer.fields.Country !== undefined
      && offer.fields.JobDescription !== undefined
      && offer.fields.MainRequirements !== undefined
      && offer.fields.AmbassadorBio !== undefined
      && offer.fields.AmbassadorPic !== undefined
      && offer.fields.AmbassadorTwitter !== undefined
  }

  escape(value) {
    return encodeURIComponent(value.toLowerCase().replace(/ /g, '-'))
  }

  createLink(company, position) {
    return '/' + this.escape(company) + '/' + this.escape(position)
  }

  render() {
    return (
      <div class={style.home}>
        <div className="container">
          <div className="offerList">
            {this.state.offers.map((offer) => {
              return (
                <a href={this.createLink(offer.fields.Company, offer.fields.Title)} style={{ textDecoration: 'none' }} key={offer.id}>
                  <div className="offerItem" data-id={offer.id} key={offer.id}>
                    <div className="mainInfo">
                      <p id="company">{offer.fields.Company}</p>
                      <h2>{offer.fields.Title}</h2>
                    </div>
                    <div className="secondaryInfo badge">
                      {offer.fields.Location}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

}