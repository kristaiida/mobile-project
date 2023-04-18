const HeartIcon = () => {
  const handlePress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={24}
        color={isFavorite ? 'red' : 'black'}
      />
    </TouchableOpacity>
  );
};