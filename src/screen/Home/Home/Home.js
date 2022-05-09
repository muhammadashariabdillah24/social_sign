import {View, Text, ToastAndroid} from 'react-native';
import React, {useState, useRef, useEffect, useMemo} from 'react';
import {ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import {
  ModalUpdateAndDelete,
  ModalAdd,
  ModalDetail,
  ModalUpdate,
} from '../../../components/Modal/Modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import AddTask from '../../../services/Task/AddTask/AddTask';
import UpdateTask from '../../../services/Task/UpdateTask/UpdateTask';
import GetAllTask from '../../../services/Task/GetAllTask/GetAllTask';
import GetTaskById from '../../../services/Task/GetTaskById/GetTaskById';
import DeleteAllTask from '../../../services/Task/DeleteTask/DeleteTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  // Ref For Button Animation
  const refButtonAdd = useRef();
  // ID
  const [id, setId] = useState('');
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  // IsLoading
  const [isLoadingModallAddNote, setIsLoadingModallAddNote] = useState(false);
  const [isLoadingModallUpdateNote, setIsLoadingModallUpdateNote] = useState()
    useState(false);
  // TextInput
  const [descriptionNote, setDescriptionNote] = useState('');
  const [titleNote, setTitleNote] = useState('');
  // Task
  const [task, setTask] = useState([]);

  const getAllTask = async () => {
    const allData = await GetAllTask();

    if (allData.status === 'success') {
      setTask(allData.tasks);
    } else {
      ToastAndroid.show(allData.message, ToastAndroid.SHORT);
      setTask([]);
    }
  };

  
  useEffect(() => {
    getAllTask();
  }, []);

  useMemo(() => {
    console.log(titleNote);
    console.log(descriptionNote);
  }, [titleNote, descriptionNote]);
  

  const onRefreshTask = async () => {
    getAllTask();
  };

  const openModalAddNote = () => {
    refButtonAdd.current.rubberBand(1000);
    setAddModalVisible(true);
  };

  const openModalUpdateAndDelete = async (id, name, description) => {
    setModalVisible(true);
    setId(id);
    setTitleNote(name);
    setDescriptionNote(description);
  };

  const openModalUpdate = async () => {
    setUpdateModalVisible(true);
  };

  const handleAddNote = async () => {
    setIsLoadingModallAddNote(true);

    const data = {
      name: titleNote,
      description: descriptionNote,
    };

    const consumeAddTask = await AddTask(data);

    if (consumeAddTask.status === 'success') {
      ToastAndroid.show('Catatan berhasil ditambahkan', ToastAndroid.SHORT);
      setTitleNote('');
      setDescriptionNote('');
      setIsLoadingModallAddNote(false);
      setAddModalVisible(false);
      getAllTask();
    } else {
      ToastAndroid.show('Catatan gagal ditambahkan', ToastAndroid.SHORT);
      setIsLoadingModallAddNote(false);
    }
  };

  const handleDeleteNote = async () => {
    const consumeDeleteTask = await DeleteAllTask(id);

    if (consumeDeleteTask.status === 'success') {
      ToastAndroid.show('Catatan berhasil dihapus', ToastAndroid.SHORT);
      setModalVisible(false);
      getAllTask();
    } else {
      ToastAndroid.show('Catatan gagal dihapus', ToastAndroid.SHORT);
    }
  };

  const handleUpdateNote = async () => {
    setIsLoadingModallUpdateNote(true);

    const data = {
      name: titleNote,
      description: descriptionNote,
    };

    const consumeUpdateTask = await UpdateTask(id, data);

    console.log(consumeUpdateTask);

    if (consumeUpdateTask.status === 'success') {
      ToastAndroid.show('Catatan berhasil diupdate', ToastAndroid.SHORT);
      setUpdateModalVisible(false);
      setIsLoadingModallUpdateNote(false);
      getAllTask();
    } else {
      ToastAndroid.show('Catatan gagal diupdate', ToastAndroid.SHORT);
      setIsLoadingModallUpdateNote(false);
    }
  };

  const handleDetailNote = async id => {
    setModalVisible(false);
    setDetailModalVisible(true);

    const consumeGetTaskById = await GetTaskById(id);

    console.log(consumeGetTaskById);

    if (consumeGetTaskById.status === 'success') {
      setTitleNote(consumeGetTaskById.task.name);
      setDescriptionNote(consumeGetTaskById.task.description);
    } else {
      ToastAndroid.show('Gagal menampilkan catatan', ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(20, 10, 38, 1)',
      }}>
      <ScrollView
        style={{
          paddingVertical: 20,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingModallAddNote}
            onRefresh={onRefreshTask}
          />
        }>
        {task.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              {
                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                width: '100%',
                borderRadius: 5,
              },
              task.length === index + 1 ? {marginBottom: 10} : {},
            ]}
            onLongPress={() =>
              openModalUpdateAndDelete(item._id, item.name, item.description)
            }
            onPress={() => handleDetailNote(item._id)}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  fontFamily: 'Raleway-Bold',
                  fontSize: 20,
                  color: '#050505',
                }}>
                {/* Trim string */}
                {item.name.length > 20
                  ? item.name.substring(0, 25) + ' ... '
                  : item.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Raleway-Regular',
                  fontSize: 14,
                  color: '#050505',
                }}>
                {item.createdAt}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 10,
                backgroundColor: '#221738',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Raleway-Regular',
                  fontSize: 16,
                  color: '#FFF',
                }}>
                {item.clock} pm
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Modal button update and delete */}

        <ModalUpdateAndDelete
          animationType={'slide'}
          visible={modalVisible}
          onDismiss={() => console.log('Modal has been dismissed')}
          styleContainer={{
            marginVertical: '50%',
            borderRadius: 10,
            padding: 10,
            height: '50%',
            backgroundColor: 'transparent',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          styleIconClose={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          iconClose={'close-circle'}
          iconCloseSize={50}
          iconCloseColor={'rgba(186, 52, 52, 1)'}
          onPressOutIconClose={() => setModalVisible(false)}
          styleAccomodateUpdateAndDelete={{
            marginTop: 50,
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPressOutIconUpdate={() => openModalUpdate()}
          styleIconUpdate={{
            marginHorizontal: 5,
            borderRadius: 5,
            backgroundColor: 'rgba(43, 90, 166, 1)',
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginVertical: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '50%',
          }}
          iconUpdate={'pencil'}
          iconUpdateSize={30}
          iconUpdateColor={'#fff'}
          styleTextUpdate={{
            color: '#fff',
            fontSize: 20,
            fontFamily: 'Raleway-Regular',
            marginLeft: 10,
          }}
          textUpdate={'Edit Catatan'}
          onPressOutIconDelete={() => handleDeleteNote()}
          styleIconDelete={{
            marginHorizontal: 5,
            borderRadius: 5,
            backgroundColor: 'rgba(186, 52, 52, 1)',
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginVertical: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '50%',
          }}
          iconDelete={'delete'}
          iconDeleteSize={30}
          iconDeleteColor={'#fff'}
          styleTextDelete={{
            color: '#fff',
            fontSize: 20,
            fontFamily: 'Raleway-Regular',
            marginLeft: 10,
          }}
          textDelete={'Hapus Catatan'}
        />

        {/* Modal Add */}
        <ModalAdd
          animationType={'slide'}
          visible={addModalVisible}
          onDismiss={() => console.log('Modal has been dismissed')}
          styleIconClose={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          iconClose={'close-circle'}
          iconCloseSize={50}
          iconCloseColor={'rgba(186, 52, 52, 1)'}
          onPressOutIconClose={() => setAddModalVisible(false)}
          styleContainer={{
            marginVertical: '20%',
            borderRadius: 10,
            padding: 10,
            height: '80%',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            flexDirection: 'column',
          }}
          styleAccomodateTitle={{
            marginTop: 50,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          styleTitleText={{
            color: 'rgba(0,0,0,0.7)',
            fontSize: 20,
            fontFamily: 'Raleway-Bold',
          }}
          textTitle={'Tambah Catatan'}
          line={{
            borderWidth: 1,
            borderColor: '#000',
            marginLeft: 10,
          }}
          styleAccomodateButtonAdd={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
            height: 50,
            backgroundColor: '#5B3E96',
            position: 'relative',
            borderRadius: 5,
            marginVertical: 10,
            marginTop: 30,
          }}
          onPressOutButtonAdd={() => handleAddNote()}
          styleIconButtonAdd={{
            position: 'absolute',
            left: 0,
            backgroundColor: '#5B2BBC',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
          iconPlus={'plus'}
          iconPlusColor={'#fff'}
          iconPlusSize={30}
          styleTextButtonAdd={{
            fontFamily: 'Raleway-Regular',
            fontSize: 14,
            color: '#fff',
          }}
          textButtonAdd={'Tambah Catatan'}
          isLoading={isLoadingModallAddNote}
          onChangeTextTitleNote={text => setTitleNote(text)}
          onChangeTextNoteDescription={text => setDescriptionNote(text)}
          titleNote={titleNote}
          descriptionNote={descriptionNote}
        />

        {/* Modal Update */}

        <ModalUpdate
          animationType={'slide'}
          visible={updateModalVisible}
          onDismiss={() => console.log('Modal has been dismissed')}
          styleIconClose={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          iconClose={'close-circle'}
          iconCloseSize={50}
          iconCloseColor={'rgba(186, 52, 52, 1)'}
          onPressOutIconClose={() => setUpdateModalVisible(false)}
          styleContainer={{
            marginVertical: '20%',
            borderRadius: 10,
            padding: 10,
            height: '80%',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            flexDirection: 'column',
          }}
          styleAccomodateTitle={{
            marginTop: 50,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          styleTitleText={{
            color: 'rgba(0,0,0,0.7)',
            fontSize: 20,
            fontFamily: 'Raleway-Bold',
          }}
          textTitle={'Tambah Catatan'}
          line={{
            borderWidth: 1,
            borderColor: '#000',
            marginLeft: 10,
          }}
          styleAccomodateButtonAdd={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width: '100%',
            height: 50,
            backgroundColor: '#5B3E96',
            position: 'relative',
            borderRadius: 5,
            marginVertical: 10,
            marginTop: 30,
          }}
          onPressOutButtonAdd={() => handleUpdateNote()}
          styleIconButtonAdd={{
            position: 'absolute',
            left: 0,
            backgroundColor: '#5B2BBC',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
          iconPlus={'plus'}
          iconPlusColor={'#fff'}
          iconPlusSize={30}
          styleTextButtonAdd={{
            fontFamily: 'Raleway-Regular',
            fontSize: 14,
            color: '#fff',
          }}
          textButtonAdd={'Tambah Catatan'}
          isLoading={isLoadingModallUpdateNote}
          onChangeTextTitleNote={text => setTitleNote(text)}
          onChangeTextNoteDescription={text => setDescriptionNote(text)}
          titleNote={titleNote}
          descriptionNote={descriptionNote}
        />

        {/* Modal Detail */}
        <ModalDetail
          animationType={'slide'}
          visible={detailModalVisible}
          onDismiss={() => console.log('Modal has been dismissed')}
          styleContainer={{
            marginVertical: '30%',
            borderRadius: 10,
            height: '60%',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
          onPressOutIconClose={() => setDetailModalVisible(false)}
          styleIconClose={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}
          iconClose={'close-circle'}
          iconCloseSize={50}
          iconCloseColor={'rgba(186, 52, 52, 1)'}
          styleTitleDetail={{
            marginTop: 50,
            marginBottom: 10,
            textAlign: 'center',
            fontFamily: 'Raleway-Bold',
            fontSize: 20,
            color: 'rgba(0,0,0,0.7)',
          }}
          titleDetail={titleNote}
          styleAccomodateDateTime={{
            marginTop: 10,
            marginBottom: 10,
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          iconDateTime={'calendar-clock-outline'}
          iconDateSize={20}
          iconDateColor={'rgba(0,0,0,0.7)'}
          styleDate={{
            fontFamily: 'Raleway-Regular',
            fontSize: 15,
            color: 'rgba(0,0,0,0.7)',
          }}
          date={'3 Mei'}
          styleTime={{
            fontFamily: 'Raleway-Regular',
            fontSize: 15,
            color: 'rgba(0,0,0,0.7)',
            marginLeft: 10,
          }}
          time={'12 pm'}
          styleTextDescription={{
            marginTop: 10,
            marginBottom: 10,
            marginHorizontal: 10,
            color: 'rgba(0,0,0,0.7)',
            fontSize: 30,
            fontFamily: 'Raleway-Regular',
          }}
          textDescription={descriptionNote}
          styleAccomodateComplete={{
            marginTop: 10,
            marginBottom: 80,
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          iconComplete={'check-circle'}
          iconCompleteSize={25}
          iconCompleteColor={'#39C4A5'}
          styleTextComplete={{
            fontFamily: 'Raleway-Regular',
            fontSize: 18,
            color: 'rgba(0,0,0,0.7)',
            marginLeft: 10,
          }}
          textComplete={'Selesai'}
          styleAccomodateButtonDelete={{
            position: 'absolute',
            bottom: 0,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: 20,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            backgroundColor: '#FF5C5C',
          }}
          onPressOutButtonDelete={() => console.log('Delete has been pressed')}
          iconDelete={'delete'}
          iconDeleteSize={20}
          iconDeleteColor={'#fff'}
          styleTextDelete={{
            fontFamily: 'Raleway-Regular',
            fontSize: 14,
            color: '#fff',
            marginLeft: 10,
          }}
          textDelete={'Hapus Catatan'}
        />
      </ScrollView>

      <Animatable.View
        ref={refButtonAdd}
        // onPress={handleAddButton}
        onTouchEnd={() => openModalAddNote()}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          margin: 10,
          padding: 10,
          backgroundColor: '#5B3E96',
          borderRadius: 5,
          alignItems: 'center',
        }}>
        <Icon name={'plus'} size={30} color={'#fff'} />
        <Text
          style={{
            fontFamily: 'Raleway-Regular',
            fontSize: 14,
            color: '#fff',
            marginLeft: 10,
          }}>
          Tambah Catatan
        </Text>
      </Animatable.View>
    </View>
  );
};

export default Home;
