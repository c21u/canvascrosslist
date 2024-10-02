import React from "react";
import { View } from "@instructure/ui-view";
import { Text } from "@instructure/ui-text";
// import { Link } from "@instructure/ui-link";
import { Link } from "react-router-dom";
import { Button } from "@instructure/ui-buttons";
import { IconPrinterSolid } from "@instructure/ui-icons";

import "./styles.css";

const Home = () => {
  return (
    <View as="div" margin="none none medium none">
      <View>
        <h1 className="crosslistTitle">Combine Courses</h1>
      </View>
      <View as="div" margin="none none medium none">
        <Text size="large" color="secondary">
          Read the following guidelines, then click ‘Continue’ at the bottom of
          the page to combine your courses.
        </Text>
      </View>
      <View as="div" margin="none none medium none">
        <Text size="medium">
          Canvas allows instructors to move section enrollments from individual
          courses and combine them into one course. This feature is helpful for
          instructors who teach several sections of the same course and only
          want to manage course data in one location.
        </Text>
      </View>
      <View as="div" margin="none none medium none">
        {/* <Text size="medium">
          Canvas allows instructors to move section enrollments from individual
          courses and combine them into one course. This feature is helpful for
          instructors who teach several sections of the same course and only
          want to manage course data in one location.
        </Text> */}
        <ol>
          <li>
            <Text>
              Open Sections: Students can communicate with and view students in
              other combined sections.
            </Text>
          </li>
          <li>
            {/* <Text>
              Isolated Sections: Students can only communicate with and view
              student in their own section. To isolate your combined sections,
              send a request to{" "}
              <Link className="linkStyle" to="mailto:canvas@gatech.edu">
                canvas@gatech.edu
              </Link>
              .
            </Text> */}
            <Text>
              Isolated Sections: Students can only communicate with and view
              students in their own section. To isolate your combined sections,
              follow the prompts provided in the tool or review the steps{" "}
              <Link
                className="linkStyle"
                to="https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0025816"
                target="_blank"
              >
                &lt;here&gt;
              </Link>
              . If you have any questions, send a request to{" "}
              <Link className="linkStyle" to="mailto:canvas@gatech.edu">
                canvas@gatech.edu
              </Link>
              .
            </Text>
          </li>
        </ol>
      </View>
      <View as="div" margin="none none medium none">
        <Text size="medium">
          There are several FERPA considerations for combining sections in
          Canvas:
        </Text>
        <ul>
          <li>
            Can I combine my sections?
            <ul>
              <li>
                If you teach the sections as a single course, then they can be
                combined. For example, if you have multiple sections that work,
                collaborate, or attend lectures together (either in-person or
                online), they could be combined.
              </li>
            </ul>
          </li>
          <li>
            Should I isolate my sections?
            <ul>
              <li>
                Section visibility is an important option to help protect you
                from violating the Family Education Rights Privacy Act (FERPA).
                When course sections meet together and you would like students
                to communicate with each other, do not isolate your sections. If
                course sections do not meet, we recommend isolating the sections
                to comply with FERPA. This setting affects all combined
                sections.
              </li>
              <li>
                When adding TAs to a course with combined sections, and the TAs
                only need access to one of the sections, we recommend isolating
                the sections to comply with FERPA.
              </li>
            </ul>
          </li>
          <li>
            Can I isolate a single student in a combined course?
            <ul>
              <li>
                Yes. If you would like to limit individual users in a section –
                as opposed to all students in a section – to only see users
                enrolled in the same section, follow the instructions at{" "}
                <Link
                  className="linkStyle"
                  to="https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-limit-a-user-to-only-interact-with-other-users-in-the/ta-p/1211"
                  target="_blank"
                >
                  https://community.canvaslms.com/docs/DOC-13026
                </Link>
                .
              </li>
            </ul>
          </li>
          <li>
            Can I combine a section I am teaching with a section taught by
            someone else?
            <ul>
              <li>
                Sections can only be combined if they all have a common
                instructor. Please contact your department scheduler (for
                Banner) or Academic Office to have additional instructors added
                to an official Canvas course via Banner.
              </li>
            </ul>
          </li>
          <li>
            What if I am unsure?
            <ul>
              <li>
                If you are unsure whether it is appropriate to combine your
                sections – or whether to isolate your combined sections –
                contact the Registrars Office at{" "}
                <Link
                  className="linkStyle"
                  to="https://registrar.gatech.edu/info/contact"
                  target="_blank"
                >
                  https://registrar.gatech.edu/info/contact
                </Link>{" "}
                for guidance.
              </li>
            </ul>
          </li>
        </ul>
      </View>
      <View as="div" margin="none none medium none">
        <Text size="medium">
          Please also review Georgia Tech’s policy and procedure for FERPA
          considerations when using Canvas at{" "}
          <Link
            className="linkStyle"
            to="https://registrar.gatech.edu/info/optional-confidentiality-flags-student-records"
            target="_blank"
          >
            https://registrar.gatech.edu/info/optional-confidentiality-flags-student-records
          </Link>
          .
        </Text>
      </View>
      <View as="div" margin="large none none none" className="excludePrint">
        <Button onClick={() => (window ? window.print() : null)}>
          Print Page <IconPrinterSolid />
        </Button>
      </View>
      <View as="div" margin="large none none none" className="excludePrint">
        <Link
          className="continueButton"
          to="/crosslist"
          // style={{
          //   color: "black",
          //   padding: "10px",
          //   borderRadius: "5px",
          //   backgroundColor: "#EAAA00",
          //   textDecoration: "none",
          // }}
        >
          I understand these guidelines, Continue
        </Link>
      </View>
    </View>
  );
};

export default Home;
