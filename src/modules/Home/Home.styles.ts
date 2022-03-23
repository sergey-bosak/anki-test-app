import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screenTitle: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  flatList: {
    marginBottom: 92,
  },
  cardContainer: {
    marginHorizontal: 16,
    backgroundColor: '#63e37e',
    marginVertical: 12,
    minHeight: 90,
    padding: 12,
    borderRadius: 6,
  },
  cardItemsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  pageButtonsContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageLabel: {
    marginRight: 12,
  },
  pageButton: {
    marginRight: 8,
  },
  currentPageLabel: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 16,
  },
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
