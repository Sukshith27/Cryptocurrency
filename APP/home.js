import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CardView from 'react-native-cardview';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['COIN', 'PRICE', 'HOLDING'],
            tableData: [],
            holdingsTotal: 0
        }
    }

    componentDidMount() {
        let holdingsTotal = 0;
        fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,NEO,WAVES,ZEC&tsyms=USD')
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson['DISPLAY']);
                this.setState({
                    tableData: responseJson['DISPLAY'],
                    tableDataRaw: responseJson['RAW'],

                })
                let { tableData, tableDataRaw } = this.state;
                Object.keys(tableData).map(item => {
                    console.log(tableDataRaw[item]['USD']['PRICE'] * 10);
                    holdingsTotal += tableDataRaw[item]['USD']['PRICE'] * 10;
                })
                this.setState({
                    holdingsTotal: Number(holdingsTotal).toFixed(2)
                })
            })
            .catch(error => console.log(error))
    }

    _renderItem = ({ item, index }) => (<View style={styles.container}>
        <TouchableOpacity>
            <Text>{item.USD}</Text>
            {/* <Text style={styles.list}>{item.JPY}</Text>
            <Text style={styles.list}>{item.EUR}</Text> */}
        </TouchableOpacity>
    </View>);

    render() {
        let { tableData, tableDataRaw, holdingsTotal } = this.state;
        return (
            <View style={styles.MainContainer}>

                <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    style={styles.cardViewStyle}>

                    <Text style={styles.cardView_InsideText}> PORTFOLIO 1 </Text>
                    <Text style={styles.cardView_InsideText}>${holdingsTotal}</Text>

                </CardView>

                <Table borderStyle={{ borderWidth: 30 }}>
                    <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                    <Text style={{ borderBottomColor: '#ffffff', borderBottomWidth: 1 }} />
                    {
                        Object.keys(tableData).map((item =>
                            <Row data={[
                                item,
                                tableData[item]['USD']['PRICE'],
                                Number(tableDataRaw[item]['USD']['PRICE'] * 10).toFixed(2)
                            ]} textStyle={styles.text} />
                        ))
                    }
                </Table>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
        backgroundColor: '#000000',
        justifyContent: 'flex-start',
    },

    cardViewStyle: {
        backgroundColor: '#1c12e5',
        width: 400,
        height: 80,
    },

    cardView_InsideText: {
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'left',
        marginTop: 10
    },

    head: {
        height: 50,
    },

    text: {
        margin: 6,
        color: '#ffffff'
    }

});