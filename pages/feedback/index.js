import { buildpath, getFileData } from "../api/feedback";

function feedbystatic(props) {
  const getfeed = props.feebackitems;
  return (
    <ul>
      {getfeed.map((feed) => (
        <li key={feed.id}>
          {feed.feedback}
          <br />
          {feed.email}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = buildpath();
  const fileData = getFileData(filePath);
  return {
    props: {
      feebackitems: fileData,
    },
  };
}

export default feedbystatic;
