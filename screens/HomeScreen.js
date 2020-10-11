import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements'

export default class HomeScreen extends Component{
    constructor(){
        super()
        this.state={
            text:'',
            isSearchPressed:false,
            isLoding:false,
            word:"Loding...",
            LexicalCategory:'',
            defination:""
        }
    }

    getWord=(word)=>{
        var url = "https://whitehat-dictionary.glitch.me./?word=" + word
        return fetch(url)
        .then((data)=>{
            return data.json()
        })
        .then((response)=>{
            var responseObject = JSON.parse(response)
            var word = responseObject.word
            var LexicalCategory = responseObject.results[0].lexicalEntries[0].LexicalCategory.text
            var defination = responseObject.results[0].lexicalEntries[0].entries[0].sense[0].defination[0]
            this.setState({
                "word" : word.trim(),
                "LexicalCategory": LexicalCategory === undefined ? "" : LexicalCategory.trim(),
                "defination" :  defination === undefined ? "":defination.trim()
            })
        })
    }
    
   render(){
    return(
      <View style ={{flex:1,borderWidth:2}}>
       <Header
       backgroundColor ={'red'}
       centerComponent = {{
           text : "Dictionary",
           style : {color:'fff',fontSize:20}
       }}
       />
       <View style = {styles.inputBoxContainer}>
           <TextInput
           style={styles.inputBox}
           onChangeText = {text =>{
            this.setState({
                text:text,
                isSearchPressed:false,
                word:"Loding...",
                LexicalCategory:'',
                example : [],
                defination : ""
            })
           }}
           value = {this.state.text}
           />
           <TouchableOpacity
           style={styles.button}
           onPress = {()=>{
               this.setState({isSearchPressed:true})
               this.getWord(this.state.text)
           }}>
            <Text style ={styles.searchText}>Search</Text>
           </TouchableOpacity>    
       </View>   
       <View style={styles.outputContainer}>
           <Text style={{fontSize:20}}>
               {
                   this.state.isSearchPressed && this.state.word === "Loading..."
                   ? this.state.word
                   :""
               }
           </Text>
           {
               this.state.word !== "Loading..." ?
               (
                   <View style={{justifyContent:'center',marginLeft:10}}>
                       <View style={styles.detailContainer}>
                        <Text style={styles.detailsTitle}>
                            Word :{""}
                        </Text>
                        <Text style={{fontSize:18}}>
                            {this.state.word}
                        </Text>
                       </View> 
                        <View style={styles.detailContainer}>
                         <Text style={styles.detailsTitle}>
                           Text:{""}
                         </Text>
                         <Text style={{fontSize:18}}>
                           {this.state.LexicalCategory}
                         </Text>
                       </View>
                       <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <Text>
                           Defination:{""} 
                        </Text>
                        <Text>
                            {this.state.defination}
                        </Text>
                       </View>          
                   </View>    
               )
               :null
           }    
       </View>          
      </View>  
       )
   }
}

const styles = StyleSheet.create({
    container : {
        flex:1
    },
    inputBoxContainer:{
        flex:0.3,
        justifyContent:"center",
        alignItems:"center"
    },
    inputBox:{
        width:'80%',
        alignSelf:"center",
        height:40,
        textAlign:"center",
        borderWidth:4
    },
    button:{
    width:'40%',
    height:40,
    justifyContent:"center",
    alignItems:"center",
    margin:10,
    borderWidth:2,
    borderRadius:10
    },
    searchText:{
        fontSize:20,
        fontWeight:"bold"
    },
    outputContainer:{
        flex:0.7,
        alignItems:"center"
    },
    detailContainer:{
    flexDirection:"row",
    alignItems:"center"
    },
    detailsTitle:{
        color:'green',
        fontSize:20,
        fontWeight:"bold"
    }
})