import { Component, State } from '@stencil/core';
import Tunnel from '../../services/Registered';
import debugFn from "debug";

const debug = debugFn("sqh-user-container");

@Component({
  tag: 'sqh-user-container',
  styleUrl: 'user-container.scss'
})
export class UserContainer {

  @State() registered: boolean;
  @State() readyToLoad: boolean;

  registerUser = () => {
    this.registered = true;
    debug("registerUser:", this.registered);
  }

  loadStats = () => {
    this.readyToLoad = true;
    debug("readyToLoad:", this.readyToLoad)
  }

  render() {
    const tunnelState = {
      registered: this.registered,
      readyToLoad: this.readyToLoad,
      registerUser: this.registerUser,
      loadStats: this.loadStats
    };

    return (
    <Tunnel.Provider state={tunnelState}>
      {
        this.readyToLoad ? 
        <div>
          <sqh-text-component
            ismarkdown={true}
            text="**Rewards Dashboard**" 
            color="#000000" 
            fontsize="13" 
            textalign="center"
            paddingtop="20" 
            paddingbottom="5"
          ></sqh-text-component>
          <sqh-stats-container
            paddingtop="0"
            paddingbottom="0"
          >
            <sqh-stat-component
              statcolor="#4caf50" 
              stattype="/referralsCount" 
              statdescription="Friends Referred"
            ></sqh-stat-component>

            <sqh-stat-component         
              stattype="/rewardsCount" 
              statdescription="Total Rewards"
              statcolor="#000000">
            </sqh-stat-component>

            <sqh-stat-component 
              stattype="/rewardBalance/CREDIT/CENTS/prettyAssignedCredit" 
              statdescription="Credit earned"
              statcolor="#000000"
            ></sqh-stat-component>

            <sqh-referral-list         
              showreferrer={true}
              usefirstreward={false}
              referralnamecolor="darkslategray" 
              referraltextcolor="lightgray" 
              rewardcolor="#4BB543" 
              pendingcolor="lightgray" 
              pendingvalue="Reward Pending"
              expiredcolor="lightgray" 
              expiredvalue="Expired Reward"
              expiredcontent="Signed up, referred {date}"
              referrervalue="Referred"
              referrercontent="Referred you {date}" 
              convertedcontent="Signed up, referred {date}" 
              pendingcontent="Trial user, referred {date}" 
              valuecontent="and {extrarewards} more {extrarewards, plural, one {reward} other {rewards}}" 
              paginatemore="View More" 
              paginateless="Previous"
              noreferralsyet="No Referrals Yet..."
              unknownuser="Your Friend"
            ></sqh-referral-list> 
          </sqh-stats-container>
        </div>
        :
        <div>
          <sqh-text-component
            ismarkdown={true}
            text="Thanks for sending your first referral!<br>Give us your email to ensure you get rewarded when your referral is used." 
            color="#000000" 
            fontsize="13" 
            textalign="center"
            paddingtop="20" 
            paddingbottom="5"
          ></sqh-text-component>
          <sqh-form-component 
            buttontext="Continue"
            buttoncolor="#35b21e"
            buttontextcolor="#FFFFFF"
            successtext="You have successfully signed up!"
            failuretext="Something went wrong. Please try again."
            loadingtext="Loading..."
            requirefirstname={true}
            requirelastname={true}
            requireemail={true}
          />
        </div>
      
      }
      </Tunnel.Provider>
      
    );
  }
}