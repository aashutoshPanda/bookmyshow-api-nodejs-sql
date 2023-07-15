set -x

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
cd "$SCRIPT_DIR"

LOGSTASH_BIN_DIR="/usr/share/logstash/bin"
PROJECT_SRC_DIR="$(dirname $SCRIPT_DIR)"
PROJECT_CONGFIG_DIR="$PROJECT_SRC_DIR/configs"
LOGSTASH_CONF_FILE_NAME="logstash-bookmyshow.conf"

LOCAL_LOGSTASH_CONF_PATH="${PROJECT_CONGFIG_DIR}/${LOGSTASH_CONF_FILE_NAME}"
USR_LOGSTASH_CONF_PATH="${LOGSTASH_BIN_DIR}/${LOGSTASH_CONF_FILE_NAME}"


# move config file to usr location
rm -rf "${USR_LOGSTASH_CONF_PATH}" 
cp "${LOCAL_LOGSTASH_CONF_PATH}" ${LOGSTASH_BIN_DIR}

# load to elastic search
cd $LOGSTASH_BIN_DIR
./logstash -f $LOGSTASH_CONF_FILE_NAME 