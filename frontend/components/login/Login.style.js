import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center', 
   // backgroundColor: '#f4f4f4',
    },
  riga: {
    flexDirection: 'row'
  },
  blueCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#1e90ff',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: -4,
  },
  title: {
    fontSize: 32,
  },
  centeredTextContainer: {
    alignItems: 'center', 
    marginTop: 20,
  },
  secondTitle: {
    fontSize: 28, 
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 80,
    borderWidth: 1,
    borderColor: 'black', // Colore della linea inferiore
  },
  inputContainer: {
    borderRadius: 8,
    marginTop: 34,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black', // Colore della linea inferiore
  },
  inputField: {
    fontSize: 16,
    height: 56,
    width: 340
  },
  button: {
    marginTop: 54,
    backgroundColor: '#1e90ff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 54,
    margin: 30,
   
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#d3d3d3',
  },
  lineText: {
    marginHorizontal: 10,
    color: '#d3d3d3', 
  },
});
export default styles;
