import React, { Component } from 'react';
import { 
  Text,
  TouchableWithoutFeedback,
  View,
  Platform,
  UIManager,
  LayoutAnimation
 } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component{
  constructor() {
    super();

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }


  componentWillUpdate() {
    LayoutAnimation.spring();
  }  
  
  renderDesciption(){
      const { library, expanded  } = this.props

      //console.log(selectedLibraryId);

      if (expanded){
        return(
          <CardSection>
            <Text style={{ flex:1 }}>{library.item.description} </Text>
          </CardSection>
        ); 
           }
    }
    render() {
      const { titleStyle } = styles;
      const { id, title } = this.props.library.item;

        return(
          <TouchableWithoutFeedback
            onPress={() => this.props.selectedLibrary(id)}
          >
            <View>
                <CardSection>
                    <Text style={titleStyle}>
                      {title}
                    </Text>
                </CardSection>
                {this.renderDesciption()}
              </View>
          </TouchableWithoutFeedback>
        );

    }
}

const styles = {
  titleStyle:{
    fontSize:18,
    paddingLeft:15,
    color:"#000"

  }
}

const mapStateToProps = (state, ownProps) => {

  const expanded = state.selectedLibraryId === ownProps.library.item.id
  return  { expanded };
}

export default connect(mapStateToProps, actions)(ListItem);
