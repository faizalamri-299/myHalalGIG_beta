import React from "react";
import styled from 'styled-components';
import { Tree, TreeNode } from "react-organizational-chart";
import {
  Input, Menu, Segment,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Table,
  Transition,
  List,
  Button,
  Divider
} from 'semantic-ui-react';

import {deleteUser, postUser, SubscriptionContext,getSubcrData } from '../subscription/subscription';
import { useParams, Link, useRouteMatch } from "react-router-dom";

import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas';

import { ClientContext } from '../client/client';

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 0px;
  display: inline-block;
  border: 1px solid red;
  background: papayawhip;

`;

const TabOrgChart = ({data}) => {

  const { premises,inhalalcom,training } = React.useContext(ClientContext);

  let printDocument=()=>{  
    const input = document.getElementById('pdfdiv');  
    html2canvas(input)  
      .then((canvas) => {  
        var imgWidth = 200;  
        var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 10;  
        pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight);
        pdf.setFont("times");
        pdf.text(75, 6, "Carta Organisasi");  
        pdf.save("orgchart.pdf");  
      });  
  }  

  const Renderorgchart=({data}) =>{

    const listItems = Object.keys(data).map((pg=0,i=0) =>

<Tree key={i}>

<TreeNode label={<StyledNode>{data[pg].name} ({data[pg].position2})</StyledNode>}>
    </TreeNode>
    </Tree>
  );

    return <Tree
    lineWidth={"2px"}
    lineColor={"black"}
    lineBorderRadius={"0px"}
    label={<StyledNode>Chairman of Internal Halal Committee</StyledNode>}
  >
    {listItems}
  </Tree>
  
  }


  return (

    <Transition transitionOnMount={true} animation="fade" duration={1000}>
      <div className="in innerContainer">

  <Button color="teal" fluid onClick={()=>printDocument()}>Muat Turun</Button>

  <br/>
  <div id="pdfdiv">
{/* {inhalalcom &&

<Renderorgchart data={inhalalcom}/> } */}

  <Tree
    lineWidth={"2px"}
    lineColor={"black"}
    lineBorderRadius={"0px"}
    label={<StyledNode>Chairman of Internal Halal Committee</StyledNode>}
  >
    <TreeNode label={<StyledNode>Halal Executive</StyledNode>}>
      {/* <TreeNode label={<StyledNode>Grand Child</StyledNode>} /> */}
    </TreeNode>
    <TreeNode label={<StyledNode>Secretary</StyledNode>}>
      {/* <TreeNode label={<StyledNode>Grand Child</StyledNode>}>
        <TreeNode label={<StyledNode>Great Grand Child 1</StyledNode>} />
        <TreeNode label={<StyledNode>Great Grand Child 2</StyledNode>} />
      </TreeNode> */}
    </TreeNode>
    <TreeNode label={<StyledNode>Safety Officer</StyledNode>}>
      {/* <TreeNode label={<StyledNode>Grand Child 1</StyledNode>} />
      <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} /> */}
    </TreeNode>
    <TreeNode label={<StyledNode>Quality Assurance Officer</StyledNode>}>
      {/* <TreeNode label={<StyledNode>Grand Child</StyledNode>} /> */}
    </TreeNode>
    <TreeNode label={<StyledNode>Surveillance Officer</StyledNode>}>
      {/* <TreeNode label={<StyledNode>Grand Child</StyledNode>} /> */}
    </TreeNode>
  </Tree>
</div>
  </div>
  </Transition>

  )
  
    }

export default TabOrgChart;
