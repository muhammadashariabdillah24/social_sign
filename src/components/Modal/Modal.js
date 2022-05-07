import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Sae} from 'react-native-textinput-effects';
import {ActivityIndicator} from 'react-native-paper';

const ModalUpdateAndDelete = ({
  styleContainer,
  visible,
  animationType,
  onDismiss,
  iconClose,
  iconCloseSize,
  iconCloseColor,
  onPressOutIconClose,
  styleIconClose,
  styleAccomodateUpdateAndDelete,
  onPressOutIconUpdate,
  styleIconUpdate,
  iconUpdate,
  iconUpdateSize,
  iconUpdateColor,
  textUpdate,
  styleTextUpdate,
  onPressOutIconDelete,
  styleIconDelete,
  iconDelete,
  iconDeleteColor,
  iconDeleteSize,
  textDelete,
  styleTextDelete,
}) => {
  return (
    <Modal
      animationType={animationType}
      visible={visible}
      onDismiss={onDismiss}
      transparent={true}>
      <View style={styleContainer}>
        <ScrollView>
          <TouchableOpacity
            onPressOut={onPressOutIconClose}
            style={styleIconClose}>
            <Icon
              name={iconClose}
              size={iconCloseSize}
              color={iconCloseColor}
            />
          </TouchableOpacity>

          <View style={styleAccomodateUpdateAndDelete}>
            <TouchableOpacity
              onPressOut={onPressOutIconUpdate}
              style={styleIconUpdate}>
              <Icon
                name={iconUpdate}
                size={iconUpdateSize}
                color={iconUpdateColor}
              />
              <Text style={styleTextUpdate}>{textUpdate}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPressOut={onPressOutIconDelete}
              style={styleIconDelete}>
              <Icon
                name={iconDelete}
                size={iconDeleteSize}
                color={iconDeleteColor}
              />
              <Text style={styleTextDelete}>{textDelete}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const ModalAdd = ({
  onPressOutIconClose,
  styleIconClose,
  iconClose,
  iconCloseSize,
  iconCloseColor,
  animationType,
  visible,
  onDismiss,
  styleContainer,
  styleAccomodateTitle,
  styleTitleText,
  textTitle,
  line,
  styleAccomodateTextInput,
  titleNote,
  iconTitleNote,
  iconTitleNoteColor,
  iconTitleNoteSize,
  inputPaddingTitleNote,
  labelHeightTitleNote,
  borderHeightTitleNote,
  autoCapitalizeTitleNote,
  autoCorrectTitleNote,
  placeholderTitleNote,
  placeholderTextColorTitleNote,
  descriptionNote,
  iconDescriptionNote,
  iconDescriptionNoteColor,
  iconDescriptionNoteSize,
  inputPaddingDescriptionNote,
  labelHeightDescriptionNote,
  borderHeightDescriptionNote,
  autoCapitalizeDescriptionNote,
  autoCorrectDescriptionNote,
  placeholderDescriptionNote,
  placeholderTextColorDescriptionNote,
  styleAccomodateButtonAdd,
  onPressOutButtonAdd,
  iconPlus,
  iconPlusColor,
  iconPlusSize,
  styleIconButtonAdd,
  styleTextButtonAdd,
  textButtonAdd,
  isLoading,
  onChangeTextTitleNote,
  onChangeTextNoteDescription,
}) => {
  return (
    <Modal
      animationType={animationType}
      visible={visible}
      onDismiss={onDismiss}
      transparent={true}>
      <View style={styleContainer}>
        <ScrollView>
          <TouchableOpacity
            onPressOut={onPressOutIconClose}
            style={styleIconClose}>
            <Icon
              name={iconClose}
              size={iconCloseSize}
              color={iconCloseColor}
            />
          </TouchableOpacity>
          <View style={styleAccomodateTitle}>
            <Text style={styleTitleText}>{textTitle}</Text>
            <View style={line} />
          </View>

          <Sae
            label={'Judul Catatan'}
            labelStyle={{
              fontSize: 15,
              color: 'rgba(0,0,0,0.7)',
              fontFamily: 'Raleway-Bold',
            }}
            iconClass={Icon}
            iconName={'pencil'}
            iconColor={'rgba(0,0,0,0.7)'}
            inputPadding={16}
            inputStyle={{
              fontSize: 15,
              color: 'rgba(0,0,0,0.7)',
              fontFamily: 'Raleway-Bold',
            }}
            labelHeight={24}
            // active border height
            borderHeight={2}
            // TextInput props
            autoCapitalize={'none'}
            multiline={true}
            scrollEnabled={true}
            autoCorrect={false}
            style={{
              marginVertical: 10,
            }}
            onChangeText={onChangeTextTitleNote}
          />

          <Sae
            label={'Masukan Deskripsi Catatan'}
            labelStyle={{
              fontSize: 15,
              color: 'rgba(0,0,0,0.7)',
              fontFamily: 'Raleway-Bold',
            }}
            iconClass={Icon}
            iconName={'pencil'}
            iconColor={'rgba(0,0,0,0.7)'}
            inputPadding={16}
            inputStyle={{
              fontSize: 15,
              color: 'rgba(0,0,0,0.7)',
              fontFamily: 'Raleway-Bold',
            }}
            labelHeight={24}
            // active border height
            borderHeight={2}
            // TextInput props
            autoCapitalize={'none'}
            multiline={true}
            scrollEnabled={true}
            autoCorrect={false}
            style={{
              marginVertical: 10,
              fontSize: 15,
              color: 'rgba(0,0,0,0.7)',
              fontFamily: 'Raleway-Bold',
            }}
            onChangeText={onChangeTextNoteDescription}
          />

          <TouchableOpacity
            disabled={isLoading}
            style={styleAccomodateButtonAdd}
            onPressOut={onPressOutButtonAdd}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <>
                <View style={styleIconButtonAdd}>
                  <Icon
                    name={iconPlus}
                    size={iconPlusSize}
                    color={iconPlusColor}
                  />
                </View>
                <Text style={styleTextButtonAdd}>{textButtonAdd}</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const ModalUpdate = ({
  onPressOutIconClose,
  styleIconClose,
  iconClose,
  iconCloseSize,
  iconCloseColor,
  animationType,
  visible,
  onDismiss,
  styleContainer,
  styleAccomodateTitle,
  styleTitleText,
  textTitle,
  line,
  styleAccomodateTextInput,
  titleNote,
  iconTitleNote,
  iconTitleNoteColor,
  iconTitleNoteSize,
  inputPaddingTitleNote,
  labelHeightTitleNote,
  borderHeightTitleNote,
  autoCapitalizeTitleNote,
  autoCorrectTitleNote,
  placeholderTitleNote,
  placeholderTextColorTitleNote,
  descriptionNote,
  iconDescriptionNote,
  iconDescriptionNoteColor,
  iconDescriptionNoteSize,
  inputPaddingDescriptionNote,
  labelHeightDescriptionNote,
  borderHeightDescriptionNote,
  autoCapitalizeDescriptionNote,
  autoCorrectDescriptionNote,
  placeholderDescriptionNote,
  placeholderTextColorDescriptionNote,
  styleAccomodateButtonAdd,
  onPressOutButtonAdd,
  iconPlus,
  iconPlusColor,
  iconPlusSize,
  styleIconButtonAdd,
  styleTextButtonAdd,
  textButtonAdd,
  isLoading,
  onChangeTextTitleNote,
  onChangeTextNoteDescription,
}) => {
  return (
    <Modal
    animationType={animationType}
    visible={visible}
    onDismiss={onDismiss}
    transparent={true}>
    <View style={styleContainer}>
      <ScrollView>
        <TouchableOpacity
          onPressOut={onPressOutIconClose}
          style={styleIconClose}>
          <Icon
            name={iconClose}
            size={iconCloseSize}
            color={iconCloseColor}
          />
        </TouchableOpacity>
        <View style={styleAccomodateTitle}>
          <Text style={styleTitleText}>{textTitle}</Text>
          <View style={line} />
        </View>

        <Sae
          label={'Judul Catatan'}
          labelStyle={{
            fontSize: 15,
            color: 'rgba(0,0,0,0.7)',
            fontFamily: 'Raleway-Bold',
          }}
          iconClass={Icon}
          iconName={'pencil'}
          iconColor={'rgba(0,0,0,0.7)'}
          inputPadding={16}
          inputStyle={{
            fontSize: 15,
            color: 'rgba(0,0,0,0.7)',
            fontFamily: 'Raleway-Bold',
          }}
          labelHeight={24}
          // active border height
          borderHeight={2}
          // TextInput props
          autoCapitalize={'none'}
          multiline={true}
          scrollEnabled={true}
          autoCorrect={false}
          style={{
            marginVertical: 10,
          }}
          onChangeText={onChangeTextTitleNote}
          value={titleNote}
        />

        <Sae
          label={'Masukan Deskripsi Catatan'}
          labelStyle={{
            fontSize: 15,
            color: 'rgba(0,0,0,0.7)',
            fontFamily: 'Raleway-Bold',
          }}
          iconClass={Icon}
          iconName={'pencil'}
          iconColor={'rgba(0,0,0,0.7)'}
          inputPadding={16}
          inputStyle={{
            fontSize: 15,
            color: 'rgba(0,0,0,0.7)',
            fontFamily: 'Raleway-Bold',
          }}
          labelHeight={24}
          // active border height
          borderHeight={2}
          // TextInput props
          autoCapitalize={'none'}
          multiline={true}
          scrollEnabled={true}
          autoCorrect={false}
          style={{
            marginVertical: 10,
            fontSize: 15,
            color: 'rgba(0,0,0,0.7)',
            fontFamily: 'Raleway-Bold',
          }}
          onChangeText={onChangeTextNoteDescription}
          value={descriptionNote}
        />

        <TouchableOpacity
          disabled={isLoading}
          style={styleAccomodateButtonAdd}
          onPressOut={onPressOutButtonAdd}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>
              <View style={styleIconButtonAdd}>
                <Icon
                  name={iconPlus}
                  size={iconPlusSize}
                  color={iconPlusColor}
                />
              </View>
              <Text style={styleTextButtonAdd}>{textButtonAdd}</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  </Modal>
  );
}

const ModalDetail = ({
  animationType,
  visible,
  onDismiss,
  styleTitleDetail,
  titleDetail,
  styleContainer,
  onPressOutIconClose,
  styleIconClose,
  iconClose,
  iconCloseSize,
  iconCloseColor,
  styleTextDescription,
  textDescription,
  styleAccomodateDateTime,
  styleDate,
  styleTime,
  date,
  time,
  styleAccomodateComplete,
  iconComplete,
  iconCompleteColor,
  iconCompleteSize,
  styleTextComplete,
  textComplete,
  styleAccomodateButtonDelete,
  onPressOutButtonDelete,
  iconDelete,
  iconDeleteColor,
  iconDeleteSize,
  styleTextDelete,
  textDelete,
  iconDate,
  iconDateSize,
  iconDateColor,
}) => {
  return (
    <Modal
      animationType={animationType}
      visible={visible}
      onDismiss={onDismiss}
      transparent={true}>
      <View style={styleContainer}>
        <TouchableOpacity
          onPressOut={onPressOutIconClose}
          style={styleIconClose}>
          <Icon name={iconClose} size={iconCloseSize} color={iconCloseColor} />
        </TouchableOpacity>

        <Text style={styleTitleDetail}>{titleDetail}</Text>

        <View style={styleAccomodateDateTime}>
          <Icon name={iconDate} size={iconDateSize} color={iconDateColor} />

          <Text style={styleDate}>{date}</Text>
          <Text style={styleTime}>{time}</Text>
        </View>

        <View style={styleTextDescription}>
          <Text>{textDescription}</Text>
        </View>

        <View style={styleAccomodateComplete}>
          <Icon
            name={iconComplete}
            size={iconCompleteSize}
            color={iconCompleteColor}
          />

          <Text style={styleTextComplete}>{textComplete}</Text>
        </View>

        <TouchableOpacity
          style={styleAccomodateButtonDelete}
          onPressOut={onPressOutButtonDelete}>
          <Icon
            name={iconDelete}
            size={iconDeleteSize}
            color={iconDeleteColor}
          />

          <Text style={styleTextDelete}>{textDelete}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export {ModalUpdateAndDelete, ModalAdd, ModalUpdate ,ModalDetail};
