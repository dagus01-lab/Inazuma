import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: 'white',
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
    marginTop: 32,
    borderBottomWidth: 1, // Spessore della linea inferiore
    borderColor: 'gray', // Colore della linea inferiore
  
  },
  input: {
    height: 40,
    width: 340,
    fontSize: 16,
  },
  box: {
    flexDirection: 'row',
    marginTop: 40,
  },
  boxDue: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    marginTop: 30,
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
});
export default styles;
