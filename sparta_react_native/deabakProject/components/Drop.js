// import React from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   Dimensions,
//   StyleSheet,
//   ScrollView,
//   Image,
// } from 'react-native';
// const { width } = Dimensions.get('window');
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import SelectDropdown from 'react-native-select-dropdown';

// function Drop({ addPostCategory, setAddPostCategory }) {
//   const data = ['기술', '환경', '교육', '교통', '보건', '정치', '문화', '경제'];
//   return (
//     <SafeAreaView style={styles.saveAreaViewContainer}>
//       <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
//       <View style={styles.viewContainer}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           alwaysBounceVertical={false}
//           contentContainerStyle={styles.scrollViewContainer}
//         >
//           <SelectDropdown
//             data={data}
//             // defaultValueByIndex={1}
//             // defaultValue={'Egypt'}
//             onSelect={selectedItem => {
//               setAddPostCategory(selectedItem);
//               console.log(addPostCategory);
//             }}
//             defaultButtonText={'Select category'}
//             buttonTextAfterSelection={(selectedItem, index) => {
//               return selectedItem;
//             }}
//             rowTextForSelection={(item, index) => {
//               return item;
//             }}
//             buttonStyle={styles.dropdown1BtnStyle}
//             buttonTextStyle={styles.dropdown1BtnTxtStyle}
//             renderDropdownIcon={isOpened => {
//               return (
//                 <FontAwesome
//                   name={isOpened ? 'chevron-up' : 'chevron-down'}
//                   color={'#444'}
//                   size={18}
//                 />
//               );
//             }}
//             dropdownIconPosition={'right'}
//             dropdownStyle={styles.dropdown1DropdownStyle}
//             rowStyle={styles.dropdown1RowStyle}
//             rowTextStyle={styles.dropdown1RowTxtStyle}
//             selectedRowStyle={styles.dropdown1SelectedRowStyle}
//             search
//             searchInputStyle={styles.dropdown1searchInputStyleStyle}
//             searchPlaceHolder={'Search here'}
//             searchPlaceHolderColor={'darkgrey'}
//             renderSearchInputLeftIcon={() => {
//               return <FontAwesome name={'search'} color={'#444'} size={18} />;
//             }}
//           />
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

// export default Drop;

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 10,
//   },

//   headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16 },

//   scrollViewContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: '10%',
//     paddingBottom: '10%',
//   },

//   dropdown1BtnStyle: {
//     width: '80%',
//     height: 50,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#444',
//   },
//   dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
//   dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
//   dropdown1RowStyle: {
//     backgroundColor: '#EFEFEF',
//     borderBottomColor: '#C5C5C5',
//   },
//   dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
//   dropdown1SelectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
//   dropdown1searchInputStyleStyle: {
//     backgroundColor: '#EFEFEF',
//     borderRadius: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#444',
//   },
// });
